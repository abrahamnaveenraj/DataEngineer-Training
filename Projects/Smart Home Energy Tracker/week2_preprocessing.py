import pandas as pd
import numpy as np

df = pd.read_csv("energy_usage.csv")

df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
df['energy_kwh'] = pd.to_numeric(df['energy_kwh'], errors='coerce')
df.dropna(subset=['timestamp','device_id','room_id','energy_kwh'], inplace=True)

device_summary = df.groupby('device_id')['energy_kwh'].agg(
    total_energy=np.sum, avg_energy=np.mean).reset_index()

room_summary = df.groupby('room_id')['energy_kwh'].sum().reset_index()
room_summary.rename(columns={'energy_kwh':'total_room_energy'}, inplace=True)

df.to_csv("cleaned_energy_usage.csv", index=False)
device_summary.to_csv("device_summary.csv", index=False)
room_summary.to_csv("room_summary.csv", index=False)

print(device_summary)
print(room_summary)
