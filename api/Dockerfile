FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10
COPY . /app/
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt
CMD ["uvicorn", "app_controller:app", "--host", "0.0.0.0", "--port", "8000"]
