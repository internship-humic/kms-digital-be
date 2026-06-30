const registry = [];

class ApiRegistry {
  register(route) {
    registry.push(route);
  }

  getRoutes() {
    return registry;
  }
}

export default new ApiRegistry();
