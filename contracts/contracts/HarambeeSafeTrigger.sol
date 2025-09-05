// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title HarambeeSafeTrigger
/// @notice Minimal example that verifies an oracle attestation (mock) and emits an event
/// which an off-chain agent can use to create a Safe transaction.
contract HarambeeSafeTrigger {
    address public oracleSigner; // expected signer (EOA) for attestations

    event AuditAttested(
        string proposalId,
        bool pass,
        uint256 confidenceBps,
        string evidenceCID,
        string modelVersion
    );

    constructor(address _oracleSigner) {
        oracleSigner = _oracleSigner;
    }

    function setOracleSigner(address _oracleSigner) external {
        // In production, ownable or multisig-only
        oracleSigner = _oracleSigner;
    }

    /// @dev Minimal mock – in production, recover signer from signature over a structured hash
    function submitAttestation(
        string calldata proposalId,
        bool decisionPass,
        uint256 confidenceBps, // 0..10000
        string calldata evidenceCID,
        string calldata modelVersion,
        bytes calldata signature
    ) external {
        require(bytes(proposalId).length > 0, "proposalId");
        require(confidenceBps <= 10000, "confidence range");
        require(signature.length > 0, "signature");

        // Mock acceptance; in real code, verify ECDSA recovered address == oracleSigner
        require(oracleSigner != address(0), "oracle unset");

        emit AuditAttested(proposalId, decisionPass, confidenceBps, evidenceCID, modelVersion);
    }
}
