import { generate as generateRandomString } from "randomstring";
import { PatientModel } from "~/domains/patient";

export const generatePatientNumber = async (): Promise<string> => {
  const num = generateRandomString({
    charset: "numeric",
    length: 5,
  });
  if (await PatientModel.findOne({ cardNumber: num }))
    return generatePatientNumber();
  return num;
};
