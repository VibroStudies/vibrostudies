import { AbstractStudyObject } from "../StudyObjects/AbstractStudyObject";

export class ResultTuple {
    /**
     * Id eines StudyObjects, wie es in der Studie gespeichert ist.
     */
    originalObjectId: number;

    /**
     * Objekt auf das referenziert wird.
     */
    object: AbstractStudyObject;

    constructor(originalObjectId: number, object: AbstractStudyObject) {
        this.originalObjectId = originalObjectId;
        this.object = object;
    }
}