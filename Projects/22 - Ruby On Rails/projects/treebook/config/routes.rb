Rails.application.routes.draw do
  root "application#hello"
    #this routes the root of the site to the application controller ruby file
    #then to the hello definition.
    #the path of the app controllor is ~/app/controllers/application_controller
end
