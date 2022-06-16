const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mongo")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Couldnt connect to Mongodb", error.message));

//Schema-> define the shape of documents in mongodb collection to define properties

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  //models
  //compiling schema to model

  const course = new Course({
    name: "Angular Course",
    author: "Hishan",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}
//createCourse();

//Querying documents or finding
//Comparison Query operators
async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course.find({ author: "Hishan", isPublished: true }) //filter documents
    .skip((pageNumber - 1) * [pageSize])
    .limit(pageSize)
    // .limit(10)//kati ota xa
    // .sort( { name:1 })//1 indicates ascending order and for decscending order -1
    // .select({ name:1, tags:1});//select the property we want to return

    //Comparison operators
    //eq (equal)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than or equal to)
    //lt (less than)
    //lte (less than or equal to)
    //in
    //nin (not in)
    // .find( {price: {$gt:10, $lte:20 } })
    // .find({price: { $in:[10, 15, 20]}})

    //Logical operators
    //or
    //and
    // .find()
    // .or([ {author:'Hishan', isPublished:true}])
    // .and([ ])//similar to find
    // console.log(courses);

    //Regular expression
    //Starts with
    //.find({ author:/^Hishan/})
    //Ends with
    //.finds({author:/Hamedani$/i})//i case insensitive ko lagi

    //contains Hishan
    // .find({author:/.*Hishan.*/i})
    .count();
  console.log(courses);
}
// getCourses();

//Approach: Query first-- if receive id from client
//findById()
//Modify its properties
//save()
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  if (!course.isPublished) return;
  // course.isPublished=true;
  // course.author="Another Author";
  course.set({
    isPublished: true,
    author: " Author",
  });
  const result = await course.save();
  console.log(result);

  //Approach :update first
  //Update directly
  //optionally :get the updated document
}

//Approach: Query first
async function updateCourse(id) {
  const course = await Course.updateMany(
    { _id: id },
    {
      $set: {
        author: "Hishan",
        isPublished: false,
      },
    }
  );
  console.log(course);

  //   //Approach :update first
  //   //Update directly
  //   //optionally :get the updated document
}

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jihad",
        isPublished: false,
      },
    },
    { new: true }
  );
  console.log(course);

  //Approach :update first
  //Update directly
  //optionally :get the updated document
}
//updateCourse("62a8953838b6e42f9a83c82a");

//Remove Document

async function removeCourse(id) {
  //deleteOne->delete one
  //deletemany-> delete many
  //  const result = await Course.deleteOne({ _id: id });
  const course = await Course.findByIdAndRemove(id);

  console.log(course);
}
removeCourse("62a8953838b6e42f9a83c82a");
