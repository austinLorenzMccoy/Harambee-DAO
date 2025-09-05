from enum import Enum
from pydantic import BaseModel, Field


class AuditDecision(str, Enum):
    PASS = "PASS"
    FAIL = "FAIL"


class AuditResultIn(BaseModel):
    proposalId: str
    decision: AuditDecision
    confidence: float = Field(ge=0.0, le=1.0)
    evidenceCID: str
    modelVersion: str
    attestationSignature: str


class AuditResultOut(BaseModel):
    proposalId: str
    decision: AuditDecision
    confidence: float
    evidenceCID: str
    modelVersion: str
    attestationValid: bool


class VoteIn(BaseModel):
    memberId: str
    proposalId: str
    vote: bool


class VoteOut(BaseModel):
    memberId: str
    proposalId: str
    vote: bool
    tally: dict
