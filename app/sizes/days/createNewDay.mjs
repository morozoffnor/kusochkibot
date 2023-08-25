import {Day} from '../../database/Schemas/Day.mjs'
import {createDay, getCurrentDay} from "../../database/database.mjs";

export async function createNewDay() {
  const dayData = {
    date: Date.now(),
    attempts: []
  }
  await createDay(dayData)
}

export async function initDays() {
  console.log('difference - ' + (new Date(2023, 8, 19) - new Date(2023, 8, 20)))
  const day = await getCurrentDay()
  if (day != null) {
    const date = day.date
    const currentTime = Date.now()
    console.log(currentTime - date)
    if ((currentTime - date)> 86400000) {
      console.log('creating new day')
      await createNewDay()
    } else {
      console.log('No need to create a new day')
    }
  } else {
    console.log('No days found, creating a brand new one')
    await createNewDay()
  }
}

//// get TZ right