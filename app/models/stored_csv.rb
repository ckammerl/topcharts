class StoredCSV
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  def self.import!(file_path)
    columns = []
    instances = []

    puts "Parsing CSV file #{file_path}"
    CSV.foreach(file_path, headers: true, header_converters: :symbol, converters: :all, encoding: 'utf-8') do |row|
      hashified_row = row.to_hash #converts CSV::Row instance into Ruby Hash instance

      # cleanup CSV download data
      if hashified_row[:iphone_downloads] == nil
        hashified_row[:iphone_downloads] = 0
      end

      if hashified_row[:ipad_downloads] == nil
        hashified_row[:ipad_downloads] = 0
      end

      # create new row total_download
      hashified_row[:total_download] = hashified_row[:iphone_downloads] + hashified_row[:ipad_downloads]

      # cleanup CSV revenue data
      if hashified_row[:iphone_revenue] != nil
        hashified_row[:iphone_revenue] = hashified_row[:iphone_revenue].gsub("$", "").to_f
      else
        hashified_row[:iphone_revenue] = 0
      end

      if hashified_row[:ipad_revenue]  != nil
        hashified_row[:ipad_revenue] = hashified_row[:ipad_revenue].gsub("$", "").to_f
      else
        hashified_row[:ipad_revenue] = 0
      end

      # create new row total_revenue
      hashified_row[:total_revenue] = hashified_row[:iphone_revenue] + hashified_row[:ipad_revenue]

      instances << create!(hashified_row)
    end
    puts "Done"
  end

  # only Paid Apps (apps for which the price is greater than zero) – sorted by order of
  # download count for “today”, with the most downloaded app first
  def self.get_paid_apps_sorted_by_downloads(num_skipped, max_return)
    entries = StoredCSV.where(:price.gt => 0.0).desc(:total_download).skip(num_skipped).limit(max_return)
    return StoredCSV.cleanup_results(entries)
  end

  # only Free Apps (apps for which the price is zero) – sorted by order of download count
  # for “today”, with the most downloaded app first
  def self.get_free_apps_sorted_by_downloads(num_skipped, max_return)
    entries = StoredCSV.where(price: 0.0).desc(:total_download).skip(num_skipped).limit(max_return)
    return StoredCSV.cleanup_results(entries)
  end

  # top Grossing Apps (all apps) – list , sorted by their download revenue for "today"
  def self.get_all_apps_sorted_by_revenue(num_skipped, max_return)
    entries = StoredCSV.desc(:total_revenue).skip(num_skipped).limit(max_return)
    return StoredCSV.cleanup_results(entries)
  end

  def self.cleanup_results(db_entries)
    result = []
    # app_ids = {}

    db_entries.each_with_index do |elem, index|
      # remove duplicates
      # if app_ids.has_key?(elem[:app_id])
      #   next
      # else
      #   app_ids[elem[:app_id]] = 1

        # limit entry to current fields of interest
        entry = Hash.new
        entry[:rank] = index
        entry[:icon] = elem[:app_icon]
        entry[:title] = elem[:app_name]
        entry[:url] = elem[:app_url]
        entry[:company] = elem[:company]
        entry[:category] = elem[:category]
        entry[:num_stars] = elem[:rating]
        entry[:num_ratings] = elem[:country_ratings]
        entry[:price] = elem[:price]

        result << entry
      # end
    end
    return result
  end

end



