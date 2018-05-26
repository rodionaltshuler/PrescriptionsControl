const PrescriptionControl = artifacts.require("./PrescriptionControl.sol");

module.exports = function(deployer) {
    deployer.deploy(PrescriptionControl);
};