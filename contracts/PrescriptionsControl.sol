pragma solidity^0.4.21;

contract PrescriptionControl {

    struct Prescription {
        uint id;
        address issuer;
        address receipient;
        bool received;
        string contents;
    }

    mapping (address => Prescription[]) prescriptions;


    function issue(address _receipient, string _contents) public {
        //TODO check whether issuer has rights to issue prescriptions
        Prescription memory newPrescription = Prescription({
           id: block.number,
           issuer: msg.sender,
           receipient: _receipient,
           received: false,
           contents: _contents
        });
        prescriptions[_receipient].push(newPrescription);
    }

    function getPrescriptionsCount(address _receipient) public view returns (uint) {
        return prescriptions[_receipient].length;
    }

    function getPrescriptionContents(address _receipient, uint _id) public view returns (string) {
        Prescription memory _prescription = findPrescription(_receipient, _id);
        return _prescription.contents;
    }

    function findPrescription(address _receipient, uint _id) private view returns (Prescription) {
        Prescription[] storage _prescriptions = prescriptions[_receipient];
        uint i = 0;
        for(i; i< _prescriptions.length; i++) {
            Prescription storage _next= _prescriptions[i];
            if (_next.id == _id) {
                return _next;
            }
        }
        revert();
    }

    function shipPrescription(address _receipient, uint _id) public returns (bool) {
        //TODO check whether we have rights to shipPrescription
        Prescription[] storage _prescriptions = prescriptions[_receipient];
        uint i = 0;
        for(i; i< _prescriptions.length; i++) {
            Prescription storage _prescription= _prescriptions[i];
            if (_prescription.id == _id) {
                if (_prescription.received == false) {
                    _prescription.received = true;
                    return _prescription.received;
                } else {
                    //Prescription exists, but was already shipped
                    revert();
                }
            }
        }
    }

}