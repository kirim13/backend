import db from "../../utils/db.server";
import { RecordType } from "@prisma/client";

type recordData = {
  type: RecordType;
  name: string;
  notes: string;
  photos: string;
  userId: string;
};
const createRecord = async (recordData: recordData) => {
  const { type, name, notes, photos, userId } = recordData;
  db.record.create({
    data: {
      type,
      name,
      notes,
      photos,
      userId,
    },
  });
};

export { createRecord };
