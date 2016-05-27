var express     = require("express"),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    methodOverride = require("method-override"),
    seedDB      = require("./seeds"),
    flash       = require("connect-flash"),
    Comment     = require("./models/comment"),
    User = require("./models/user");

// Requiring routes
var indexRoutes         = require("./routes/index"),
    campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments");


// seedDB(); //seed the database
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost/yelp_camp_v10");
// mongoose.connect("mongodb://arun:arun@ds017193.mlab.com:17193/arunsai0310");




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

app.use(flash());

//====================
//PASSPORT CONFIGURATION
//===================

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(req,res){
    console.log("The YelpCamp server has started");
});