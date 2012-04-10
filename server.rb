require 'sinatra/base'
require 'json'
require './lib/headcount'

module Headcount
  class Server < Sinatra::Base
    get '/' do
      @data = Headcount.data
      
      erb :index
    end
  end
end