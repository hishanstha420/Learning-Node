const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // const schema  =Joi.object({
  //     name: Joi.string().min(3).required(),
  // });

  // const result=schema.validate(req.body);

  // // if (!req.body.name || req.body.name.length<3) {
  // //     //400 bad request
  // //     res.status(400).send('Name is required and should be minimum 3 character');
  // //     return;
  // // }

  // if (result.error) {
  //     res.status(400).send(result.error.details[0].message);
  //     return;
  // }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

//Http Put request

router.put("/:id", (req, res) => {
  //Look up the course
  //If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with id not found");
    return;
  }

  //validate
  //If invalid, return 400 bad request
  //const result=validateCourse(req.body);
  const { error } = validateCourse(req.body); // object destructring result.error
  if (error)
    //result.error lekhirakhnu pardaina
    return res.status(400).send(error.details[0].message);

  //Update Course
  //return the updated course
  course.name = req.body.name;
  res.send(course);
});

validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

//HTTP delete request

router.delete("/:id", (req, res) => {
  //Look up the course
  //Not existing return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with id not found");

  //Delete

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

router.get("/:id", (req, res) => {
  // res.send(req.params.id);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with id not found");
  res.send(course);
});

router.get("/:id", (req, res) => {
  // res.send(req.params.id);

  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) res.status(404).send("The course with id not found");

  res.send(course);
});

router.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

module.exports = router;
