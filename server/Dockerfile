FROM python:3.8-alpine
WORKDIR /server
ADD . /server
RUN pip install -r requirements.txt
CMD ["python", "app.py"]