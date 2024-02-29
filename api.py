import pymongo
import datetime
import serial
import math

# Connexion à la base de données MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["projet_IOT"]
collection = db["Milieu"]

prec_temperature = 0

def add_data():
    global prec_temperature
    # Configuration de la liaison série avec Arduino
    ser = serial.Serial(port="COM10", baudrate=9600)
    # Boucle infinie pour enregistrer en temps réel les données
    while True:
        # Lecture des données de température et d'humidité de la liaison série
        line = ser.readline().decode("utf-8").strip()
        data = line.split(",")
        if len(data) == 2:
            # Récupération des données de température et d'humidité
            temperature = float(data[0])
            humidite = float(data[1])
            if math.isnan(temperature) == False or math.isnan(humidite) == False:
                if prec_temperature==0 or temperature != prec_temperature:
                    # Récupération de la date actuelle
                    current_date = datetime.datetime.now()
                    # Insertion des données dans la collection de la base de données MongoDB
                    data = {"created_at": current_date, "temperature": temperature, "humidite": humidite}
                    collection.insert_one(data)
                    print("Date: {}, Temperature: {:.1f}°C, humidite: {}%".format(current_date, temperature, humidite))

                    # Mise à jour de la température précédente
                    prec_temperature = temperature
                else:
                    print("La temperature n'a pas changé")
            else:
                print("Pas de valeurs")
        else:
            print("Erreur de lecture au port serial: ", line)

add_data()