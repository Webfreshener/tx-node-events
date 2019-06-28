const _nodeEvent = require("./index")();
const _emitter = new (require("events"))();

const _goodData = {
    on: {
        events: ["bar", "event"],
        emitter: _emitter,
    }
};

process.on('uncaughtException', (e) => {
    console.log(e)
});

const _cb = jest.fn();
describe("Node Event Test Pipe", () => {
    let _tx = _nodeEvent.txWrite({
        on: {
            events: ["event"],
            emitter: _emitter,
        }
    });

    it("should validate _txPipe", (done) => {
        _tx.subscribe({
            next: (d) => {
                done(`should have errored`);
            },
            error: (e) => {
                done();
            }
        });
        _tx.txWrite({on: {bad: "data"}});
    });

    // it("should validate input", (done) => {
    //     const _tx = require("./index")();
    //     _tx.subscribe({
    //         next: () => {
    //             done("should have errored");
    //         },
    //         error: (e) => {
    //             done();
    //         }
    //     });
    //     const _goodData = {
    //         on: {
    //             events: ["bar"],
    //             emitter: _emitter,
    //     // {
    //     //             _eventsCount:0,
    //     //             _events:{},
    //     //             on: () => ({
    //     //                 error: () => false,
    //     //                 event: () => false,
    //     //             }),
    //     //         },
    //         },
    //     };
    //     const _badData = {on: {bad: "data"}};
    //     // console.log(_tx.txTap());
    //     _tx.txWrite(_badData);
    //     // _emitter.emit("bar", "lala");
    // });


    it("should handle events", () => {
        _tx.subscribe({
            next: (n) => {
                _cb();
            },
            error: (e) => {
                done(e);
            }
        });

        _emitter.emit("event", {data: "ok-1"});
        _emitter.emit("event", {data: "ok-2"});

        setTimeout(() => {
            expect(_cb).toHaveBeenCalledTimes(2);
        }, 10);

        // expect((typeof _tx.txTap().subscribe)).toEqual("function");
        // expect((typeof _tx.txTap().events)).toEqual("object");
        // expect(_tx.txTap().events[0]).toEqual("error");
        // expect(_tx.txTap().events[1]).toEqual("event");
        // _emitter.emit("error", "an error occurred");
    });

    it("should handle errors", () => {

    });

});
