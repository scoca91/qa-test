import sha256 from "crypto-js/hmac-sha256";

let dateNow = String(Date.now());
const apiKey = '4ed44360-19e0-4136-b69f-263860bfa1ba';
const secret = '208760c4f254516247a6f6cb30f4d1d6c210317d4875b7b5b27cc2ffc89292b3';
const signature = sha256(`"apiKey":"${apiKey}","timestamp":"1689072462979"`, secret).toString()

const getApiTokenUrl = "https://admin-api-shared.staging.exberry-uat.io/api/auth/token";
const createCalendarUrl = "https://admin-api-shared.staging.exberry-uat.io/api/v2/calendars";
const createInstrumentUrl = "https://admin-api-shared.staging.exberry-uat.io/api/v2/instruments";
const createMpUrl = "https://admin-api-shared.staging.exberry-uat.io/api/mps";



describe("Perform calls", function () {


    before("Get API Key", function () {
        const getAPIKeyBody = {
            "email": "qacandidate@gmail.com",
            "password": "p#xazQI!Y%z^L34a#"
        }

        cy.request({ method: "POST", url: getApiTokenUrl, body: getAPIKeyBody, headers: { 'Content-Type': 'application/json' } }).then(response => {
            // cy.log(response.body);
            expect(response.status).to.equal(200);
            // this.response.body['token'];
            // cy.log(response.body['token']);
            cy.wrap(response.body['token']).as('apiToken')
        })
    })

    it("Create Calendar VIA API", function () {

        let calendarId = new Date().getTime();
        const calendarBody = {
            "id": `${calendarId}`,
            "tradingDays": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
            ],
            "name": `AutomatedApiCalendar${calendarId}`,
            "timeZone": "+00:00",
            "marketOpen": "08:00",
            "marketClose": "16:30",
            "holidays": [
                {
                    "date": "2022-01-01",
                    "closeTime": "13:00",
                    "name": "New Yaer"
                }
            ]
        }

        cy.request({ method: "POST", url: createCalendarUrl, body: calendarBody, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiToken}` } }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body['name']).to.contain(calendarId)
            cy.wrap(response.body['id']).as('calendarId');
        })

    })

    it("Create Instrument VIA API", function () {

        let calendarId = this.calendarId;
        cy.log(`This is the calendarId ${calendarId}`)
        const InstrumentBody = {
            "symbol": `${new Date().getTime()}`,
            "quoteCurrency": "USD",
            "calendarId": `${this.calendarId}`,
            "pricePrecision": "6",
            "quantityPrecision": "4",
            "minQuantity": "0.0001",
            "maxQuantity": "10000000",
            "activityStatus": "ACTIVE",
            "description": "Testing instrument V2"
        };

        cy.request({ method: "POST", url: createInstrumentUrl, body: InstrumentBody, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiToken}` } }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body['calendarId']).to.contain(calendarId)
            cy.log(response.body);
            cy.log(calendarId)

        })
    })


    it("Create MP VIA API", function () {
        let timeStamp = new Date().getTime();
        const mpBody = {
            "name": `AutomatedMP${timeStamp}`,
            "compId": `${timeStamp}`,
            "id": `${timeStamp}`
        }

        cy.request({ method: "POST", url: createMpUrl, body: mpBody, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiToken}` } }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body['name']).to.contain(timeStamp)
            cy.log(response.body)

        })
    })


    it("generate session", function () {

        let generateSessionBody = {
            "d": {
              "apiKey": apiKey,
              "signature": signature,
              "timestamp": `1689072092789`
            },
            "q": "exchange.market/createSession",
            "sid": 1
          }

        //print signature
        cy.log(signature);
        cy.log(this.calendarId);
        cy.log(this.instrument)
        // cy.request({ method: "POST", url: "wss://sandbox-shared.staging.exberry-uat.io", body: generateSessionBody, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiToken}` } }).then(response => {
        //     expect(response.status).to.equal(200);
        //     cy.log(response.body)

        // })

    })

})



