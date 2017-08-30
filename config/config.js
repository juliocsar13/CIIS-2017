
module.exports = {
	port :process.env.PORT || 8000,
	db:process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.MONGODB_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/ciistacna"


}