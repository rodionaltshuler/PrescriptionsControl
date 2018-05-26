const PrescriptionControl = artifacts.require("PrescriptionControl");

module.exports = function(deployer) {
    deployer.deploy(PrescriptionControl);
};