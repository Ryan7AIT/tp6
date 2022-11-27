from flask import Flask, render_template

app = Flask(__name__)

persons =  [
	{
        "no" : 1,
		"nom" : "JOHN",
		"prenom" : "DOE",
		"points" : 15
	},
	{
        "no" : 2,
		"nom" : "BOB",
		"prenom" : "CARLON",
		"points" : 9
	},

	{
        "no" : 3,
		"nom" : "RAYANE",
		"prenom" : "SMITH",
		"points" : 13
	},

]


@app.route('/')
def index():
	return render_template('index.html')

@app.route('/getData')
def doGetData():



    return render_template('data.html', persons = persons)

if __name__ == "__main__":
	app.run(debug=True)