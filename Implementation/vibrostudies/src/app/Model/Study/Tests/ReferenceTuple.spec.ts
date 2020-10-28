import { ReferenceTuple } from "../ReferenceTuple";

const id = 1337;
const isFixed = true;

describe("ReferenceTuple", function () {
  it("getId_givesExpectedId.", function () {
    expect(createDefaultReferenceTuple().ID).toEqual(id);
  });
  it("getIsFixed_givesExpectedIsFixed.", function () {
    expect(createDefaultReferenceTuple().isFixed).toEqual(isFixed);
  });

  it("setId_setsExpectedId.", function () {
    expect(createDefaultReferenceTuple().ID = 4).toEqual(4);
  });
  it("setIsFixed_setsExpectedIsFixed.", function () {
    expect(createDefaultReferenceTuple().isFixed = false).toEqual(false);
  });
});


function createDefaultReferenceTuple(): ReferenceTuple {
    const tuple = new ReferenceTuple(id, isFixed);
  return tuple;
}
