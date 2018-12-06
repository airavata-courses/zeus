import unittest
from app import server
import sys

class MyTestClass(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass


    def setUp(self):
        # self.app = server.python_flask_ms().test_client()
        # self.app.testing = False
        pass
    def tearDown(self):
        # return
        pass

    def test_python_flask_ms_server(self):
        # result = self.app.get('/')
        # self.assertEqual(result.status_code, 200)
        pass

if __name__ == '__main__':
    unittest.main()

