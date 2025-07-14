from flask import Flask, render_template_string, request, redirect, url_for

app = Flask(__name__)

# Store the menus for each day of the week
menu_data = {
    "Monday": {"breakfast": "", "lunch": "", "snacks": "", "dinner": ""},
    "Tuesday": {"breakfast": "", "lunch": "", "snacks": "", "dinner": ""},
    "Wednesday": {"breakfast": "", "lunch": "", "snacks": "", "dinner": ""},
    "Thursday": {"breakfast": "", "lunch": "", "snacks": "", "dinner": ""},
    "Friday": {"breakfast": "", "lunch": "", "snacks": "", "dinner": ""},
    "Saturday": {"breakfast": "", "lunch": "", "snacks": "", "dinner": ""},
    "Sunday": {"breakfast": "", "lunch": "", "snacks": "", "dinner": ""}
}

@app.route('/')
def index():
    return render_template_string('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weekly Menu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            margin: 20px;
        }
        .day-section {
            margin-bottom: 20px;
        }
        input[type="text"] {
            width: 100%;
            padding: 8px;
            margin: 5px 0;
        }
        button {
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Menu for the Week</h1>
        <form action="/submit" method="POST">
            {% for day, meals in menu_data.items() %}
                <div class="day-section">
                    <h3>{{ day }}</h3>

                    <label for="{{ day }}_breakfast">Breakfast (Choose 2 items)</label>
                    <input type="text" name="{{ day }}_breakfast" id="{{ day }}_breakfast" value="{{ meals['breakfast'] }}">

                    <label for="{{ day }}_lunch">Lunch (Rice, Fry, Curry, Papu, Rasam, Curd, White Rice)</label>
                    <input type="text" name="{{ day }}_lunch" id="{{ day }}_lunch" value="{{ meals['lunch'] }}">

                    <label for="{{ day }}_snacks">Snacks (Tea, Milk, or Rasana)</label>
                    <input type="text" name="{{ day }}_snacks" id="{{ day }}_snacks" value="{{ meals['snacks'] }}">

                    <label for="{{ day }}_dinner">Dinner (Specify)</label>
                    <input type="text" name="{{ day }}_dinner" id="{{ day }}_dinner" value="{{ meals['dinner'] }}">
                </div>
            {% endfor %}
            <button type="submit">Submit Menu</button>
        </form>
    </div>

</body>
</html>
    ''', menu_data=menu_data)

@app.route('/submit', methods=['POST'])
def submit_menu():
    global menu_data
    # Loop over each day and set the values for breakfast, lunch, snacks, and dinner
    for day in menu_data.keys():
        menu_data[day]["breakfast"] = request.form.get(f"{day}_breakfast")
        menu_data[day]["lunch"] = request.form.get(f"{day}_lunch")
        menu_data[day]["snacks"] = request.form.get(f"{day}_snacks")
        menu_data[day]["dinner"] = request.form.get(f"{day}_dinner")
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
