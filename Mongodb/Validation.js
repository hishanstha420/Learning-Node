const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Couldnt connect to Mongodb", error.message));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //builtin validator
    minlength: 5,
    maxlength: 255,
    //match: /pattern/
  },
  category: {
    type: String,
    enum: ["web", "mobo"],
    required: true,
    lowercase: true, //convert all value of category to lowercase
    trim: true, //removes padding
  },

  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      //custom validation
      //USING CALLBACK
      //   validator: function (v, callback) {
      //     setTimeout(() => {
      //       const result = v && v.length > 0;
      //       callback(result);
      //     }, 4000);
      //   },
      //   message: "A course must have one tag",

      //USING PROMISE
      validator: function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 2000);
        });
      },
      message: "A course must have one tag",
    },
  },

  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Hishan",
    category: "WEB",
    tags: ["frontend", "Backend"],
    isPublished: true,
    price: 15.8,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
    //console.log(ex.message);
  }
}
//createCourse();

async function getCourses() {
  const courses = await Course.find({ _id: "62ab0cb82c217db47f6b21da" })
    .sort({ name: 1 })
    .select({ name: 1, price: 1 });
  console.log(courses[0].price);
}
getCourses();
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
}

async function removeCourse(id) {
  const course = await Course.findByIdAndRemove(id);

  console.log(course);
}
