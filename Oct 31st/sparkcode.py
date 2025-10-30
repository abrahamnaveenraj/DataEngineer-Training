from pyspark.sql import SparkSession
from pyspark.sql.functions import sum as spark_sum

# Create Spark Session
spark = SparkSession.builder \
    .appName("Retail_Insights") \
    .getOrCreate()

# Load CSV Data
products = spark.read.csv("products.csv", header=True, inferSchema=True, sep=',')
sales = spark.read.csv("sales.csv", header=True, inferSchema=True, sep=',')
inventory = spark.read.csv("inventory.csv", header=True, inferSchema=True, sep=',')

# Join DataFrames
sales_products_df = sales.join(products, on="product_id")
final_df = sales_products_df.join(inventory, on="product_id")

# Category & Region-wise Sales Analysis
sales_summary = final_df.groupBy("category", "region") \
    .agg(spark_sum("quantity").alias("total_units_sold"))

print("✅ Category-Wise & Region-Wise Sales Summary")
sales_summary.show()

# Export Results
sales_summary.write.csv("category_region_sales.csv", header=True)
sales_summary.write.parquet("category_region_sales.parquet")

print("📁 Output saved as CSV & Parquet")