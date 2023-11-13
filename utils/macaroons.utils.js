import { MacaroonsBuilder } from 'macaroons.js';

export const addFirstPartyCaveatsAndSerialize = (macaroon, caveatsList) => {
  let decodedMacaroon = MacaroonsBuilder.deserialize(macaroon);
  var newRestrictedMacaroon = decodedMacaroon;

  for (let caveat of caveatsList) {
    newRestrictedMacaroon = MacaroonsBuilder.modify(newRestrictedMacaroon)
      .add_first_party_caveat(caveat)
      .getMacaroon();
  }
  
  let newRestrictedMacaroonEncoded = newRestrictedMacaroon.serialize();

  return newRestrictedMacaroonEncoded;
};
