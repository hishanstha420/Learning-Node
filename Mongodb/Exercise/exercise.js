const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mongo")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Couldnt connect to Mongodb", error.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

// async function showCourses() {
//   const courses = await Course.find({ tags: "backend", isPublished: true })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });
//   console.log(courses);
// }
// showCourses();

// async function displayCourses() {
//   const courses = await Course
//   .find({isPublished:true})
//   //.find({isPublished:true,tags:{$in:['frontend','backend']}})
//     .or([{tags:'frontend'}, {tags:'backend'}])
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1,price:1 });
//   console.log(courses);
// }
// displayCourses();

async function printCourses(){
  const courses=await Course
.find({isPublished:true})
.or([{ price:{$gte:15}},{name:/.*by.*/i}])
console.log(courses);
}
printCourses();
