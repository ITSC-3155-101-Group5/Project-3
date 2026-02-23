"use strict";

function TemplateProcessor(template) {
  this.template = template;
}

// Replace placehodler in the template with values from the data object 
TemplateProcessor.prototype.fillIn = function (data) {
  // use regex to find all placeholder of the form (property)
  // the (.*?) catch the property name inside braces 
  return this.template.replace(/{{(.*?)}}/g, function(match, property) {

    // check if data object cointain the request property
    if (data.hasOwnProperty(property)) {
      // replace holder with the matching value 
      return data[property];
    }

    // if the  property does not natch , replace with an empty string   
    return "";
  });

};
