import cookie from "cookie";
import { MacaroonsBuilder } from "macaroons.js";

import _ from "lodash";

export const parseCookies = (cookies) => {
  return cookie.parse(cookies ? cookies : "");
};

export const parseMacaroonToken = (token) => {
  if (!token) {
    return;
  }
  let macaroonDecoded = MacaroonsBuilder.deserialize(token);
  let macaroonDetailsDecoded = _.split(macaroonDecoded.inspect(), "\n");
  macaroonDetailsDecoded.pop();

  let groupedCids = [];
  // Use map to iterate over each string and split it at the first space
  const macaroonDetailsFormatted = _.fromPairs(
    macaroonDetailsDecoded.map((s) => {
      const [key, ...rest] = s.split(/ (.+)/); // Split at the first space.
      if(key == "cid") {
        groupedCids.push(rest.join(" "));
        return [key, groupedCids];
      }
      return [key, rest.join(" ")]; // Join the rest back together.
    })
  );

  return macaroonDetailsFormatted;
};

export const parseSharingOptionsIntoACaveatList = (sharingOptions) => {
  let caveatsList = [];
  if (
    _.has(sharingOptions, "resources") &&
    !_.isEmpty(sharingOptions["resources"])
  ) {
    let resourceCaveat = "";
    for (let key in sharingOptions["resources"]) {
      if (sharingOptions["resources"][key] == true) {
        resourceCaveat += `resource_ref_number = ${key} OR `;
      }
    }
    if (resourceCaveat != "") {
      resourceCaveat = resourceCaveat.slice(0, -4);
    } else {
      resourceCaveat = "resource_ref_number = None";
    }
    caveatsList.push(resourceCaveat);
  }

  if (_.has(sharingOptions, "timeout")) {
    let timeout = parseInt(sharingOptions["timeout"]);
    let currentDatetime = new Date();
    let expirationDatetime = new Date(
      currentDatetime.getTime() + timeout * 1000
    );
    let expirationCaveat = `expiration < ${expirationDatetime.toISOString()}`;
    caveatsList.push(expirationCaveat);
  }
  return caveatsList;
};
