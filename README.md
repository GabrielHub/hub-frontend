## Pro-Am Analytics Hub

A comprehensive glossary and analytics hub for 2K data, built with Firebase, Express, React, and Node.

How does it work?
> Upload an image of game data => Process image and store data => Update player based on games uploaded => Generate advanced stats

What can you do with it?
1. Generate and view advanced data using NBA analytics (equations from basketball reference)
2. Compare and rank players by statistic
3. Compare to NBA players, leveraging data from the NBA website/api

### TODOS:
> Add Player Comparison Tool
- Maybe link from player page? Or another tab on the analytics page
- Add advanced analytics API
    - returns who is a better shooter and why
    - returns who is a better defender and why
> Career Highs (league + player)
- Add `career` subcollection to `players`
- League average scheduled function should also calculate league highs in stats based on player `career` subcollection
> Refactor for new seasons (years)

![image](https://github.com/GabrielHub/hub-frontend/assets/16616486/de2e869c-ddb3-465a-9397-af84132dbed5)
![image](https://github.com/GabrielHub/hub-frontend/assets/16616486/c1c91a7f-1790-435e-adc1-27ae2465b140)
![image](https://github.com/GabrielHub/hub-frontend/assets/16616486/0c1d0240-bcda-4169-ab0f-f5b750043a1a)
