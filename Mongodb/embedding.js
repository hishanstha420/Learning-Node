const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);
//Embedding Documents
// const Course = mongoose.model(
//   "Course",
//   new mongoose.Schema({
//     name: String,
//     author: {
//       type: authorSchema,
//       required: true,
//     },
//   })
// );

//Using array of sub document
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId) {
  //const course = await Course.findById(courseId);
  // const course = await Course.updateOne(
  //   { _id: courseId },
  //   {
  //     $set: {
  //       "author.name": "Mosh",
  //     },
  //   }
  // );
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
  // course.author.name = "Mosh Hamedani";
  // course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
removeAuthor("62aeee7dbbde5aeaa68c918b", "62aeef5cd728274a67b25baa");
//addAuthor("62aeee7dbbde5aeaa68c918b", new Author({ name: "Amy" }));

// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "Josh" }),
// ]);

//updateCourse("62aeea90bd36da8415b21782");
