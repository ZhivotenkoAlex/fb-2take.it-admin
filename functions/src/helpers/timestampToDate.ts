import {Timestamp} from "firebase-admin/firestore"

export type TimestampType = {
  _seconds: number
  _nanoseconds: number
}

export const timestampToDate = (timestamp?: TimestampType): Date | null => {
  if (!timestamp) {
    return null
  }
  let newTimestamp

  if (timestamp instanceof Timestamp) {
    newTimestamp = new Timestamp(
      timestamp._seconds,
      timestamp._nanoseconds
    ).toDate()
  } else {
    newTimestamp = timestamp
  }
  return newTimestamp as Date
}

export const dateToTimestamp = (
  date?: Date
): TimestampType | Date | undefined | null => {
  if (!date) {
    return null
  }
  const seconds = Math.floor(new Date(date).getTime() / 1000)
  const nanoseconds = (new Date(date).getTime() % 1000) * 1000000
  return new Timestamp(seconds, nanoseconds) as unknown as TimestampType
}
