import { PubSubManger } from "./Manager";

// setInterval(() => {
    PubSubManger.getInstance()?.Subscribe(Math.random().toString(),"trump");
    PubSubManger.getInstance()?.Display();
// }, 5000);
// PubSubManger.getInstance()?.DisplayRecord();