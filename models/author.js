const mongoose = require("mongoose");
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required:true,
    maxLength:100
  },
  family_name: {
    type: String,
    required:true,
    maxLength:100 
  },
  date_of_birth: Date,
  date_of_death: Date
});

AuthorSchema.virtual('name').get(function(){
  if (this.first_name&&this.family_name) {
    return `${this.family_name}, ${this.first_name}`;
  }
  return '';
})

AuthorSchema.virtual('url').get(function(){
  return `/catalog/author/${this._id}`
})

AuthorSchema.virtual('date_of_birth_formatted').get(function(){
  if (this.date_of_birth){
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  } else {
    return '';
  }
})

AuthorSchema.virtual('date_of_death_formatted').get(function(){
  if (this.date_of_death){
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  } else {
    return '';
  }
})

AuthorSchema.virtual('lifespan').get(function(){
  return this.date_of_birth_formatted + ' - ' + this.date_of_death_formatted;
})

AuthorSchema.virtual('date_of_birth_for_input').get(function(){
  return DateTime.fromJSDate(this.date_of_birth).toISODate();
})
AuthorSchema.virtual('date_of_death_for_input').get(function(){
  return DateTime.fromJSDate(this.date_of_death).toISODate();
})

module.exports = mongoose.model('Author', AuthorSchema);