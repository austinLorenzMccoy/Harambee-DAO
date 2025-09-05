from functools import lru_cache
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    APP_ENV: str = Field(default="dev")
    LOG_LEVEL: str = Field(default="INFO")

    IPFS_API_URL: str = Field(default="http://localhost:5001")
    ORACLE_SIGNER: str = Field(default="0x0000000000000000000000000000000000000000")
    CELESTIA_ENDPOINT: str = Field(default="http://localhost:26658")
    GROQ_API_KEY: str | None = Field(default=None)
    GROQ_API_URL: str = Field(default="https://api.groq.com/openai/v1/chat/completions")

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache

def get_settings() -> Settings:
    return Settings()


settings = get_settings()
