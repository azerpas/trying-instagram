import fs from "mz/fs";

const saveSession = async (data: object) => {
    await fs.writeFile("../../.session", JSON.stringify(data));
} 

const existsSession = async (): Promise<boolean> => await fs.exists("../../.session");

const loadSession = async () => {
    return await fs.readFile("../../.session");
}

export {saveSession, existsSession, loadSession}