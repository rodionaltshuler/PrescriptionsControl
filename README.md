**Medical prescriptions control system**  
Ethereum blockchain based solution

**The problem set this solution addresses**
1. Forgery of medical prescriptions
2. Tampering the history of prescriptions issued
3. Transparency of this data for all participants: authorities, doctors and patients

**Solution architecture**

1. Smart contract deployed to Ethereum network (main net or other one - to be discussed). Smart contract sets rules for prescription issuance and consumption, storing data regarding these actions.

2. Client application (web-based) for doctors and patients, allowing to issue prescriptions, cancel them and mark consumed. Web interface also provides prescription history for specific patient or doctor.

3. Database linking Ethereum addresses of patients and doctors to real identities. It allows to display readable data to authorized persons, and grant/revoke permissions for doctors to issue prescriptions (this function is centralized by nature). This database supposed to be deployed on server, controlled by local (or global) authority. Central ownership of this data doesn't neutralize benefits of blockchain solution (with a decentralization among of them), as owner of it's database can't tamper historical data or forge prescriptions.           

4. Mobile ID application, allowing it's users to prove the ownership of specific blockhain id (Ethereum public address), so it could be used for receiving drugs in the pharmacy according to prescription. We can't rely on passport (or other government-issued ID), because patient real names not stored on a blockchain, only their blockchain ids (addresses).

**Technical stack**
1. Smart contract development, testing and deployment: Solidity, Truffle
2. Client web application: JS, Typescript, React.JS, web3
3. User database: Firebase for proof of concept, production solution TBD
4. Mobile ID: Android native app (Kotlin)
