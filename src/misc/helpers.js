export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(" ");

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }

  return splitName[0][0];
}

export function objectToArr(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map((roomId) => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}

export async function getUserUpdate(userId, keyToUpdate, value, db) {
  const updates = {};

  updates[`/profiles/${userId}/${keyToUpdate}`] = value;

  const getMsgsRef = db
    .ref(`/messages`)
    .orderByChild("author/uid")
    .equalTo(userId)
    .once("value");
  const getRoomsRef = db
    .ref(`/rooms`)
    .orderByChild("/lastMessage/author/uid")
    .equalTo(userId)
    .once("value");

  const [msgSnap, roomSnap] = await Promise.all([getMsgsRef, getRoomsRef]);

  msgSnap.forEach((msgSnap) => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });

  roomSnap.forEach((roomSnap) => {
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  return updates;
}
