import pandas as pd
import numpy as np
import io

# Sample CSV data
csv_data = """
order_id,supplier_id,order_date,delivery_date,quantity
101,1,2025-09-01,2025-09-05,100
102,2,2025-09-02,2025-09-10,50
103,1,2025-09-03,2025-09-04,200
104,3,2025-09-01,2025-09-15,150
105,2,2025-09-04,,75
"""
df = pd.read_csv(io.StringIO(csv_data))

# Data cleaning
df = df.dropna(subset=['delivery_date'])
df['order_date'] = pd.to_datetime(df['order_date'])
df['delivery_date'] = pd.to_datetime(df['delivery_date'])

# Processing with NumPy
today = pd.Timestamp.today()
df['delay_days'] = (today - df['delivery_date']).dt.days
df['is_delayed'] = np.where(df['delay_days'] > 0, 1, 0)

# Save cleaned dataframe to CSV
df.to_csv("cleaned_supply_chain_data.csv", index=False)

print("✅ Data processed and saved to cleaned_supply_chain_data.csv")
