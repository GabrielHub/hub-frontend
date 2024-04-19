## Pro-Am Analytics Hub

A comprehensive glossary and analytics hub for 2K data, built with Firebase, Express, React, and Node.

How does it work?
> Upload an image of game data => Process image and store data => Update player based on games uploaded => Generate advanced stats

What can you do with it?
1. Generate and view advanced data using NBA analytics (equations from basketball reference)
2. Compare and rank players by statistic
3. Compare to NBA players, leveraging data from the NBA website/api
4. View positional and league data

### TODOS:
> Discord webhooks
- Update a rankings channel for each ranking threshold change
- reach: update roles based on rating?
> Remove auto admin on claims
- Anyone can have an account and can edit their details (name, ftPerc)
    - unique check for aliases
- Admins can view and create or remove other admins (new endpoint)
- users collection for new accounts
> Refactor for new seasons (years)
- current `pace` field is actually the est. possessions. Convert that to possessions and calculate the pace factor correctly
    - pace factor should be for 48 minutes. it currently estimates possessions over 20 minutes
- fix issue with drtg. It is way too low so something must be wrong with the calculation
- elo should be on a per game basis, but needs to be refactored to work that way when the new year starts
- bpm should be on a per game basis, but needs to be refactored to work that way when the new year starts
- fix types on the backend. Advanced stats will always be there when starting a new year
- change percentages to be raw values, instead of storing them as readable values
> Career Highs (league + player)
- Add `career` subcollection to `players`
- League average scheduled function should also calculate league highs in stats based on player `career` subcollection

### How to setup
`npm run start` to run locally
Deploys automatically to production when merging or pushing to `main`

![image](https://github.com/GabrielHub/hub-frontend/assets/16616486/de2e869c-ddb3-465a-9397-af84132dbed5)
![image](https://github.com/GabrielHub/hub-frontend/assets/16616486/c1c91a7f-1790-435e-adc1-27ae2465b140)
![image](https://github.com/GabrielHub/hub-frontend/assets/16616486/0c1d0240-bcda-4169-ab0f-f5b750043a1a)
