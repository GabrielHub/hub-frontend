import { initializeApp } from 'firebase/app';
import { getVertexAI, getGenerativeModel, Schema } from 'firebase/vertexai';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_KEY } from '../constants';

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: 'gabrielhub-60a30.firebaseapp.com',
  projectId: 'gabrielhub-60a30',
  storageBucket: 'gabrielhub-60a30.appspot.com',
  messagingSenderId: '746245931286',
  appId: '1:746245931286:web:146fbb569d5c8d250a9037'
};

const jsonSchema = Schema.object({
  properties: {
    boxscore: Schema.object({
      properties: {
        teamTotals: Schema.array({
          items: Schema.object({
            properties: {
              id: Schema.string(),
              team: Schema.number(),
              name: Schema.string(),
              grd: Schema.string(),
              pts: Schema.number(),
              treb: Schema.number(),
              ast: Schema.number(),
              stl: Schema.number(),
              blk: Schema.number(),
              pf: Schema.number(),
              tov: Schema.number(),
              fgm: Schema.number(),
              fga: Schema.number(),
              threepm: Schema.number(),
              threepa: Schema.number(),
              ftm: Schema.number(),
              fta: Schema.number()
            }
          })
        }),
        playerTotals: Schema.array({
          items: Schema.object({
            properties: {
              id: Schema.string(),
              team: Schema.number(),
              name: Schema.string(),
              pos: Schema.number(),
              oppPos: Schema.number(),
              isAI: Schema.number(),
              grd: Schema.string(),
              pts: Schema.number(),
              treb: Schema.number(),
              ast: Schema.number(),
              stl: Schema.number(),
              blk: Schema.number(),
              pf: Schema.number(),
              tov: Schema.number(),
              fgm: Schema.number(),
              fga: Schema.number(),
              threepm: Schema.number(),
              threepa: Schema.number(),
              ftm: Schema.number(),
              fta: Schema.number()
            }
          })
        })
      }
    })
  }
});

const app = initializeApp(firebaseConfig);
const vertexAI = getVertexAI(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const model = getGenerativeModel(vertexAI, {
  model: 'gemini-2.0-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: jsonSchema,
    temperature: 0
  }
});

export default {};
