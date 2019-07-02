import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template,request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

app = Flask(__name__)


#################################################
# Database Setup
#################################################
# engine = create_engine("sqlite:///db/gviolence_db.sqlite?check_same_thread=False")
engine = create_engine("sqlite:///db/gviolence_db.sqlite", connect_args={'check_same_thread': False}, echo=True)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
GViolence = Base.classes.GV

# Create our session (link) from Python to the DB
session = Session(engine)

@app.route("/stack/<state>")
def sample(state):

    results = session.query(GViolence.STATE, 
    GViolence.LATITUDE, GViolence.LONGITUDE, 
    func.count(GViolence.STATE)).group_by(GViolence.LATITUDE, 
    GViolence.LONGITUDE).having(func.count(GViolence.STATE) > 0). \
    filter(GViolence.STATE == state).all()

    total = []
    l = len(results)

    for i in range(l):
        a = dict(zip(["state","lat","lon","count"], results[i]))
        total.append(a)

    return jsonify(total)

@app.route("/")
def index():
    """Return the homepage."""

    return render_template('stacked.html')

if __name__ == "__main__":
    app.run(debug=True)

