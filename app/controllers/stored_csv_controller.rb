class StoredCsvController < ApplicationController
  respond_to :json

  def show
    type = params[:type]
    num_skip = params[:num_skip]
    limit_result = params[:limit_result]

    if validate_param_is_int(num_skip)
      num_skip_to_i = num_skip.to_i
    else
      puts 'Error: invalid parameter - must be a number'
      return
    end

    if validate_param_is_int(limit_result)
      limit_result_to_i = limit_result.to_i
    else
      puts 'Error: invalid parameter - must be a number'
      return
    end

    case type
    when 'paid'
      respond_with StoredCSV.get_paid_apps_sorted_by_downloads(num_skip_to_i, limit_result_to_i)
    when 'free'
      respond_with StoredCSV.get_free_apps_sorted_by_downloads(num_skip_to_i, limit_result_to_i)
    when 'all'
      respond_with StoredCSV.get_all_apps_sorted_by_revenue(num_skip_to_i, limit_result_to_i)
    else
      puts 'Error: invalid parameter - unknown type'
    end
  end

  private

  def validate_param_is_int(param_as_string)
    return !(param_as_string == nil || param_as_string.to_i.to_s != param_as_string || param_as_string.to_i < 0)
  end

end
