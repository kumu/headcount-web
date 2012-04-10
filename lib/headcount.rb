module Headcount
  def self.data
    File.readlines('/Users/ryanmohr/devel/kumu/rails/db/headcount.json').map {|line| JSON.parse(line)}
  end
  
  def self.sample_data
    [
      {timestamp: '2009 Q3', a: 100, b: 75},
      {timestamp: '2010 Q2', a: 75, b: 50},
      {timestamp: '2010 Q3', a: 75, b: 50},
      {timestamp: '2011 Q1', a: 50, b: 25},
      {timestamp: '2011 Q3', a: 50, b: 25},
      {timestamp: '2011 Q4', a: 75, b: 50},
      {timestamp: '2012 Q2', a: 100, b: 75}
    ]
  end
end