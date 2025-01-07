import { CronJob } from "cron";
import mysqldump from "mysqldump";

export const backupDBLocally = async () => {
  try {
    await mysqldump({
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      dumpToFile: "./backups",
    });
    console.log("backup database successfull");
  } catch (error) {
    console.log("error in backup database locally");
    throw error;
  }
};

export const backupCronJob = new CronJob(
  "0 * * * * *", // Run every day at 9:00 AM
  async () => {
    console.log(
      "backup Job started executed at:",
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Colombo",
        dateStyle: "full",
        timeStyle: "long",
      }).format(new Date())
    );
    try {
      await backupDBLocally();
    } catch (error) {
      console.log(error);
      console.log(
        "backup Job failed  at:",
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          dateStyle: "full",
          timeStyle: "long",
        }).format(new Date())
      );
    }
  },
  false,
  true, // Start the job immediately
  "Asia/Colombo"
);

export const sendBackUp = async () => {
  const result = await mysqldump({
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });
  //sending mechanism to be implemented here
};
