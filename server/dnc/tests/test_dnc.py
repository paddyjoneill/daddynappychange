import os
import tempfile

import pytest

from dnc import app


@pytest.fixture
def client():
    dnc.app.config['TESTING'] = True

    with dnc.app.test_client() as client:
        yield client

