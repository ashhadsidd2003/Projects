import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";

const app = express();
const port = 3000;
let posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true
}));


app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success"); 
  res.locals.error = req.flash("error");     
  next();
});

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res.render("index.ejs",{posts : posts});
});

app.get("/about", (req,res)=>{
    res.render("about.ejs");
})


app.get("/delete/:index", (req,res)=>{
  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= posts.length) {
        req.flash("error", "Post you are trying to delete doesnot exist"); 
        return res.redirect("/");       
  }
  const postToDel = posts[index];
  res.render("delete.ejs", {postToDel : postToDel, index : index});

});

app.get("/add", (req,res)=>{
    res.render("new.ejs");

});

app.get("/edit/:index", (req,res)=>{
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= posts.length) {
        req.flash("error", "Post you are trying to edit doesnot exist"); 
        return res.redirect("/");       
    }
    const post = posts[index];
    res.render("edit.ejs", {post : post , index : index});
});

app.post("/add", (req,res)=>{
    const post = {
        title : req.body.title,
        content : req.body.content,
    }
    if (!post.title.trim() || !post.content.trim()) {
      req.flash("error", "Title and content cannot be empty");
      return res.redirect("/add");
    }
    posts.push(post);
    req.flash("success", "Post added!");
    res.redirect("/");
})

app.post("/delete/:index", (req,res) =>{
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= posts.length) {
        req.flash("error", "Post you are trying to delete doesnot exist");     
    }
    else{
        posts.splice(index,1);
        req.flash("success", "Post deleted successfully!");        
    }
    res.redirect("/");

});

app.post("/edit/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= posts.length) {
    req.flash("error", "Post you are trying to edit does not exist");
    return res.redirect("/");
  }

  const editedPost = {
    title: req.body.title,
    content: req.body.content,
  };
  if (!editedPost.title.trim() || !editedPost.content.trim()) {
    req.flash("error", "post cannot be empty"); 
    return res.redirect(`/edit/${index}`);
  }

  posts[index] = editedPost;
  req.flash("success", "Post updated successfully!");
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});