const express = require("express");
const router = express.Router();
const passport = require('passport');
require('../../middleware/passport')(passport)