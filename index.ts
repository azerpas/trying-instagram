import { IgApiClient } from "instagram-private-api";
import 'dotenv/config'
import { saveSession, existsSession, loadSession } from "./src/session";

const ig = new IgApiClient();

const username = process.env.IG_USERNAME;
const password = process.env.IG_PASSWORD;
if(!username || !password) throw new Error("Can't retrieve password or username from .env(.local|.test)")

ig.state.generateDevice(username);
ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants;
    saveSession(serialized);
});

(async () => {
    if (existsSession()) {
        await ig.state.deserialize(loadSession());
    }
    await ig.simulate.preLoginFlow();
    const user = await ig.account.login(username, password);
    const userFeed = ig.feed.user(user.pk);
    const myPostsFirstPage = await userFeed.items();
    console.log(myPostsFirstPage[0]);
})();