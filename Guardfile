guard 'coffeescript', :output => '.' do
  watch('^src/(.*)\.coffee')
end

guard 'coffeescript', :output => 'spec/javascripts' do
  watch('^spec/coffeescripts/(.*)\.coffee')
end

guard 'livereload' do
  watch('^spec/javascripts/.+\.js$')
  watch('^.+\.js$')
end
